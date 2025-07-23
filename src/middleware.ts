import {BootServer} from "hat-server";
import {UtilsHelper_isDevelopmentMode, CacheProvider} from "hat-ring-components";
import type {APIContext, MiddlewareNext} from "astro";
import {MonitoringProvider} from "hat-ring-components/src/providers/MonitoringProvider.ts";

export const onRequest = async (context: APIContext, next: MiddlewareNext) => {

    MonitoringProvider.counter('info.middleware.onRequest');
    try {
        if (context.request.url.includes('.php')) {
            return new Response('not found', {
                status: 404
            });
        }

        const bypassPaths = {
            POST: [],
            GET: []
        };
        if (bypassPaths[context.request.method]?.some((path: string) => context.request.url.includes(path))) {
            return await next();
        }

        const bootServer = new BootServer({
            apolloClientTimeout: 20000,
            cacheProvider: CacheProvider,
            use304Functionality: false,
        });
        const retResponse = await bootServer.applyMiddlewareBefore(context, next);

        MonitoringProvider.counter('info.middleware.applyMiddlewareBefore');

        //@ts-ignore
        if (retResponse && retResponse.responseToReturn) {
            //@ts-ignore
            return retResponse.responseToReturn;
        }

        context.locals["hatControllerParams"] = context.request["hatControllerParamsInstance"];
        let response = await next();

        await bootServer.applyMiddlewareAfter(context, response, retResponse);
        MonitoringProvider.counter('info.middleware.applyMiddlewareAfter');

        if (!UtilsHelper_isDevelopmentMode()) {
            try {
                const html = await response.text();
                if (response.status !== 404) {
                    response.headers.set(
                        'content-length',
                        Buffer.byteLength(html, 'utf8').toString(),
                    );
                }

                return new Response(html, {
                    status: response.status,
                    headers: response.headers,
                });
            } catch (err) {
                MonitoringProvider.counter('error.middleware.catch');
                console.error('❌ error on URL:', context.url.pathname);
                console.error('err', err);
                return new Response('Internal server error', {
                    status: 503,
                    headers: response.headers,
                });

            }
        } else {
            return response;
        }
    } catch (err) {
        MonitoringProvider.counter('error.middleware.catchAll');
        console.error('❌ error on URL:', context.url.pathname);
        console.error('err', err);
        return new Response('Internal server error', {
            status: 503,
        });
    }

};
