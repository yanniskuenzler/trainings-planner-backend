class FormatTraining {
    trainingJSON = [];

    addTrainingToJSON(trainingHeader, trainingBody) {
        let tempJSON = {
            "id": trainingHeader.training_ID,
            "date": trainingHeader.date,
            "weekday": trainingHeader.weekday,
            "trainingCategory": trainingHeader.trainingCategoryName,
            "duration": trainingHeader.duration,
            "distance": trainingHeader.totalDistance,
            "content": []
        };

        trainingBody.forEach((item) => {
            let tempSectionJSON = {
                sectionCategory: item.sectionCategoryName,
                value: item.sectionContent,
                index: item.sectionIndex
            }

            tempJSON.content.push(tempSectionJSON);
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