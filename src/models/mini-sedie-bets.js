import mongoose from "mongoose";

const schema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    phien: { type: Number, required: true },

    even: { type: Number, default: 0 },
    odd: { type: Number, default: 0 },
    red3: { type: Number, default: 0 },
    red4: { type: Number, default: 0 },
    white3: { type: Number, default: 0 },
    white4: { type: Number, default: 0 },

    thanhtoan: { type: Boolean, default: false },
    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    memberId: { type: Number },
    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    currency: { type: String, require: true },
    rate: { type: Number, require: true },
    partnerId: { type: String, require: true },
});

const bets = mongoose.model("MiniSedie_cuoc", schema);

export { bets as MiniSeDieBets };
