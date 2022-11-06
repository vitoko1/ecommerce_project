const { json } = require("express");

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString };

        const removeFields = ['Keyword','limit','page'];
        removeFields.forEach(element => delete queryCopy[element]);

        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryString));
        return this;

    }

    pagination(resultsPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures