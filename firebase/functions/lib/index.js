"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");
admin.initializeApp(functions.config().firebase);
const app = express();
app.disable("x-powered-by");
const client = new vision.ImageAnnotatorClient();
app.get("/", function (req, res) {
    res.status(200).send(`Welcome...`);
});
app.get("/getBarcode", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucketName = 'verity-ebd35.appspot.com';
        const fileName = req.param('fileName');
        client
            .batchAnnotateImages(fileName)
            .then(results => {
            const allData = [];
            const labels = results[0].responses;
            // for (const item of labels) {
            //     allData.push(item.description)
            // }
            res.status(200).send(labels);
        })
            .catch(err => {
            res.status(400).send(err);
        });
    });
});
app.get("/getVisionLable", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucketName = 'verity-ebd35.appspot.com';
        const fileName = req.param('fileName');
        client
            .labelDetection(fileName)
            .then(results => {
            const allData = [];
            const labels = results[0].labelAnnotations;
            for (const item of labels) {
                allData.push(item.description);
            }
            res.status(200).send(allData);
        })
            .catch(err => {
            res.status(400).send(err);
        });
    });
});
app.get("/getVisionLogo", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucketName = 'verity-ebd35.appspot.com';
        const fileName = req.param('fileName');
        client
            .logoDetection(fileName)
            .then(results => {
            const logos = results[0].logoAnnotations;
            res.status(200).send(logos);
        })
            .catch(err => {
            res.status(400).send(err);
        });
    });
});
app.get("/getVisionWeb", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucketName = 'verity-ebd35.appspot.com';
        const fileName = req.param('fileName');
        client
            .webDetection(fileName)
            .then(results => {
            const webDetection = results[0].webDetection;
            const reselts = [];
            if (webDetection.fullMatchingImages.length) {
                for (const item of webDetection.fullMatchingImages) {
                    reselts.push(item.url);
                }
            }
            if (webDetection.partialMatchingImages.length) {
                for (const item of webDetection.partialMatchingImages) {
                    reselts.push(item.url);
                }
            }
            if (webDetection.webEntities.length) {
                for (const item of webDetection.webEntities) {
                    reselts.push(item.description);
                }
            }
            if (webDetection.bestGuessLabels.length) {
                for (const item of webDetection.bestGuessLabels) {
                    reselts.push(item.label);
                }
            }
            res.status(200).send(reselts);
        })
            .catch(err => {
            res.status(400).send(err);
        });
    });
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map