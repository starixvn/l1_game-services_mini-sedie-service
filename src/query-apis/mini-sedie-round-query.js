import { Core } from "sc-game-base";
import { ResultHelper } from "../helpers/index";

export default class MiniSeDieRoundQuery extends Core.QueryApis.RoundQuery {
    convertSettlementResult(roundResult) {
        return ResultHelper.getSettlementResult(roundResult);
    }

    convertResult(round) {
        return {
            red1: round.red1,
            red2: round.red2,
            red3: round.red3,
            red4: round.red4,
        };
    }
}
