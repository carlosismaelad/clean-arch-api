import "dotenv/config";

const fastify = "./webserver/ports/fastify";
const express = "./webserver/ports/express";
const server = process.env.SERVER_TYPE === "fastify" ? fastify : express;

require(server);
