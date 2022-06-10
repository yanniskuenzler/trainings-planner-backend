class FormatTraining {
    trainingJSON = [];

    addTrainingToJSON(trainingHeader, trainingBody) {
        let tempJSON = {
            "id": trainingHeader.training_ID,
            "date": trainingHeader.date,
            "weekday": trainingHeader.weekday,
            "trainingCategory": trainingHeader.trainingCategoryName,
            "duration": trainingHeader.duration,
            "contents": []
        };

        trainingBody.forEach((item) => {
            let tempSectionJSON = {
                sectionCategory: item.sectionCategoryName,
                value: item.sectionContent
            }

            tempJSON.contents.push(tempSectionJSON);
        });

        this.trainingJSON.push(tempJSON);
        return this.trainingJSON;
    }

    getTrainingJSON() {
        return this.trainingJSON;
    }

    resetJSON() {
        this.trainingJSON = [];
    }
}

module.exports = FormatTraining;