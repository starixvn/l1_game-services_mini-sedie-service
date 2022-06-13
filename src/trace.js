import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { JaegerPropagator } from "@opentelemetry/propagator-jaeger";
import { SocketIoInstrumentation } from "opentelemetry-instrumentation-socket.io";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { CompositePropagator, W3CTraceContextPropagator, W3CBaggagePropagator } from "@opentelemetry/core";
import { MongooseInstrumentation } from "opentelemetry-instrumentation-mongoose";
import { B3InjectEncoding, B3Propagator } from "@opentelemetry/propagator-b3";

const trace = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "MiniSedie Service",
        [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: "LOCAL",
    }),
    spanProcessor: new BatchSpanProcessor(
        new JaegerExporter({
            tags: [],
            endpoint: "http://10.10.50.69:14268/api/traces",
        })
    ),
    textMapPropagator: new CompositePropagator({
        propagators: [
            new JaegerPropagator(),
            new W3CTraceContextPropagator(),
            new W3CBaggagePropagator(),
            new B3Propagator({
                injectEncoding: B3InjectEncoding.MULTI_HEADER,
            }),
        ],
    }),
    instrumentations: [
        new HttpInstrumentation({
            ignoreIncomingRequestHook: (req) => {
                return req.hostname.includes("/health");
            },
        }),
        new MongooseInstrumentation(),
        new SocketIoInstrumentation(),
    ],
});

export default trace;
