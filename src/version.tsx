import {AppContext} from "hat-ring-components";

export function Version({context}: {context: AppContext}) {
    const version = __VERSION__;
    return <>
        <meta name="ver" content={version} />
        <meta name="variant" content={context.hatControllerParams?.websiteManagerVariant} />
    </>
}

