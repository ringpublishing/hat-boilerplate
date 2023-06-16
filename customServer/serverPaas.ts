// @ts-ignore
import next from "next";
import { BootServer, BootServerConfig, DefaultHatSite } from "@ringpublishing/hat-server";
import http from "http";
import type { ApolloQueryResult } from "@apollo/client";
import { serverConfig } from "./serverConfig";
let httpServer = {};

class ServerPaas {
  httpServer: http.Server;
  constructor() {}

  async listen(...args) {
    this.httpServer.listen(...args);
  }
  async getClusterNode() {
    const bootServer = new BootServer(serverConfig);
    bootServer.setNextApp(next(bootServer.getNextConfig()));
    // @ts-ignore
    await bootServer.start(false);
    this.httpServer = bootServer.getHttpServer();
    this.httpServer.keepAliveTimeout = 65000;
    this.httpServer.headersTimeout = 66000;
    return this.httpServer;
  }

  on(...args) {
    // @ts-ignore
    httpServer.on(...args);
  }
}

module.exports.Server = ServerPaas;
