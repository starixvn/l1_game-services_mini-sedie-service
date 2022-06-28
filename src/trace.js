import { initTrace } from "sc-instrument";
import appConfigs from "./app-configs";
import gameSettings from "./game-settings";

const trace = initTrace(gameSettings.name, appConfigs.sentry.env, appConfigs.otel.jaegerCollectorUri);

await trace.start();

process.on("SIGTERM", () => {
    trace
        .shutdown()
        .then(
            () => console.log("SDK shut down successfully"),
            (err) => console.log("Error shutting down SDK", err)
        )
        .finally(() => process.exit(0));
});

export default trace;
