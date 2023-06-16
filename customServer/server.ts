// @ts-ignore
import next from "next";
import { BootServer, BootServerConfig, DefaultHatSite } from "@ringpublishing/hat-server";
import http from "http";
import type { ApolloQueryResult } from "@apollo/client";
import { serverConfig } from "./serverConfig";

const bootServer = new BootServer(serverConfig);
bootServer.setNextApp(next(bootServer.getNextConfig()));
bootServer.start();
