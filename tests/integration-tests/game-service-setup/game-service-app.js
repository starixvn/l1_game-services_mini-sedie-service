import { Core, Table } from "sc-game-base";
import { initAPIStub, stubUserService } from "sc-game-service-integration-utils";

import appConfigs from "../../../src/app-configs.IGT";
import constants from "../../../src/constants";
import gameSettings from "../../../src/game-settings";
import { generateResult, getSettlementResult, generateRawResultForHash } from "../../../src/helpers/result-helper";
import MiniSeDieContainerRegistry from "../../../src/mini-sedie-container-registry";

export const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    stubUserService(appConfigs);

    const definition = new Core.GameDefinition(gameSettings, generateResult, getSettlementResult, generateRawResultForHash);
    const gameData = new Table.TableGameData(gameSettings.durations.wholeRound, constants.resetTotalBets);
    const container = new MiniSeDieContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("MiniSeDie", appConfigs);
    await app.run();
    try {
        await app.startGame(container);
    } catch (ex) {
        const x = 1;
    }
};

run();
