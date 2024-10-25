import "dotenv/config";

const fastify = "./infra/webserver/ports/fastify";
const express = "./infra/webserver/ports/express";
const server = process.env.SERVER_TYPE === "fastify" ? fastify : express;

require(server);
