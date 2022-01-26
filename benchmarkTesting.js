// Postgres
import ppkg from "pg";
const { Pool, Client } = ppkg;
const pool = new Pool();
const postgresClientMain = new Client({
  user: "mason",
  host: "localhost",
  database: "SPROJ",
  password: "password",
  port: 5432,
});
//MongoDB
import mpkg from "mongodb";
const { MongoClient } = mpkg;
const uri =
  "mongodb+srv://masonqpb:sprojdraftpassword@sandbox.tra3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoClientMain = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import {cachedQueries, uncachedQueries, subsetQueries, unionQueries, baseQueries} from './queryStore.js';
import {query} from './mongo_postgres_interface.js';
import {clearTables} from "./postgresFunctions.js";

const masterQueryArray = cachedQueries.concat(uncachedQueries);
const subsetUnionQueryArray = subsetQueries.concat(unionQueries);

//Cached queries vs uncached queries
async function cachedVsUncached() {
    let groupOneQueryTimes = [];
    let groupTwoQueryTimes = [];
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Postgres tables wiped to ensure integrity of tests
        clearTables(postgresClientMain);

        //Initial group of queries Cached in Postgres
        for (var queryTemp in cachedQueries) {
            const queryLabel = cachedQueries[queryTemp][0];
            const collection = cachedQueries[queryTemp][1];
            const aggregateQuery = cachedQueries[queryTemp][2];
            await query(collection, queryLabel, aggregateQuery, true, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
        }

        //Time logged for running 30 cached queries
        for (var cachedTemp in cachedQueries) {
            const queryLabel = cachedQueries[cachedTemp][0];
            const collection = cachedQueries[cachedTemp][1];
            const aggregateQuery = cachedQueries[cachedTemp][2];
            var start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            var end = process.hrtime(start);
            groupOneQueryTimes.push((end[1]/1000000).toFixed(3) + 'ms');
        }

        //Time logged for running 30 uncached queries
        for (var uncachedTemp in uncachedQueries) {
            const queryLabel = uncachedQueries[uncachedTemp][0];
            const collection = uncachedQueries[uncachedTemp][1];
            const aggregateQuery = uncachedQueries[uncachedTemp][2];
            var startTwo = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            var endTwo = process.hrtime(startTwo);
            groupTwoQueryTimes.push((endTwo[1]/1000000).toFixed(3) + 'ms');
        }
    } catch (e) {
        console.log(e);
    } finally {
        console.log('**************** RESULTS ******************');
        console.log('Group One Query Times:');
        console.log(groupOneQueryTimes);
        console.log('\n Group Two Query Times');
        console.log(groupTwoQueryTimes);
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

//Uncached queries vs Union and Subset Checking 
async function uncachedVsUnionSubsetChecking() {
    let groupOneQueryTimes = [];
    let groupTwoQueryTimes = [];
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Postgres tables wiped to ensure integrity of tests
        clearTables(postgresClientMain);

        //Initial group of base queries Cached in Postgres
        for (var queryTemp in baseQueries) {
            const queryLabel = baseQueries[queryTemp][0];
            const collection = baseQueries[queryTemp][1];
            const aggregateQuery = baseQueries[queryTemp][2];
            await query(collection, queryLabel, aggregateQuery, true, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
        }

        //Time logged for running 30 uncached queries WITHOUT Union and Subset checking
        for (var uncachedTemp in subsetUnionQueryArray) {
            const queryLabel = subsetUnionQueryArray[uncachedTemp][0];
            const collection = subsetUnionQueryArray[uncachedTemp][1];
            const aggregateQuery = subsetUnionQueryArray[uncachedTemp][2];
            var start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            var end = process.hrtime(start);
            groupOneQueryTimes.push((end[1]/1000000).toFixed(3) + 'ms');
        }

        //Time logged for running 30 uncached queries WITH Union and Subset checking
        for (var uncachedTempTwo in subsetUnionQueryArray) {
            const queryLabel = subsetUnionQueryArray[uncachedTempTwo][0];
            const collection = subsetUnionQueryArray[uncachedTempTwo][1];
            const aggregateQuery = subsetUnionQueryArray[uncachedTempTwo][2];
            var startTwo = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, true, false, postgresClientMain, mongoClientMain, masterQueryArray);
            var endTwo = process.hrtime(startTwo);
            groupTwoQueryTimes.push((endTwo[1]/1000000).toFixed(3) + 'ms');
        }
    } catch (e) {
        console.log(e);
    } finally {
        console.log('**************** RESULTS ******************');
        console.log('Group One Query Times:');
        console.log(groupOneQueryTimes);
        console.log('\n Group Two Query Times');
        console.log(groupTwoQueryTimes);
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

//Uncached queries vs Semantic Checking 
async function uncachedVsSemanticChecking() {
    let groupOneQueryTimes = [];
    let groupTwoQueryTimes = [];
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Postgres tables wiped to ensure integrity of tests
        clearTables(postgresClientMain);

        //Initial group of base queries Cached in Postgres
        for (var queryTemp in baseQueries) {
            const queryLabel = baseQueries[queryTemp][0];
            const collection = baseQueries[queryTemp][1];
            const aggregateQuery = baseQueries[queryTemp][2];
            await query(collection, queryLabel, aggregateQuery, true, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
        }

        //Time logged for running 30 uncached queries WITHOUT Semantic checking
        for (var uncachedTemp in subsetUnionQueryArray) {
            const queryLabel = subsetUnionQueryArray[uncachedTemp][0];
            const collection = subsetUnionQueryArray[uncachedTemp][1];
            const aggregateQuery = subsetUnionQueryArray[uncachedTemp][2];
            var start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            var end = process.hrtime(start);
            groupOneQueryTimes.push((end[1]/1000000).toFixed(3) + 'ms');
        }

        //Time logged for running 30 uncached queries WITH Semantic checking
        for (var uncachedTempTwo in subsetUnionQueryArray) {
            const queryLabel = subsetUnionQueryArray[uncachedTempTwo][0];
            const collection = subsetUnionQueryArray[uncachedTempTwo][1];
            const aggregateQuery = subsetUnionQueryArray[uncachedTempTwo][2];
            var startTwo = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, true, postgresClientMain, mongoClientMain, masterQueryArray);
            var endTwo = process.hrtime(startTwo);
            groupTwoQueryTimes.push((endTwo[1]/1000000).toFixed(3) + 'ms');
        }
    } catch (e) {
        console.log(e);
    } finally {
        console.log('**************** RESULTS ******************');
        console.log('Group One Query Times:');
        console.log(groupOneQueryTimes);
        console.log('\n Group Two Query Times');
        console.log(groupTwoQueryTimes);
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

//Union and Subset Checking vs Semantic Checking
async function unionSubsetCheckingVsSemanticChecking() {
    let groupOneQueryTimes = [];
    let groupTwoQueryTimes = [];
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Postgres tables wiped to ensure integrity of tests
        clearTables(postgresClientMain);

        //Initial group of base queries Cached in Postgres
        for (var queryTemp in baseQueries) {
            const queryLabel = baseQueries[queryTemp][0];
            const collection = baseQueries[queryTemp][1];
            const aggregateQuery = baseQueries[queryTemp][2];
            await query(collection, queryLabel, aggregateQuery, true, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
        }

        //Time logged for running 30 uncached queries with Semantic checking
        for (var uncachedTempTwo in subsetUnionQueryArray) {
            const queryLabel = subsetUnionQueryArray[uncachedTempTwo][0];
            const collection = subsetUnionQueryArray[uncachedTempTwo][1];
            const aggregateQuery = subsetUnionQueryArray[uncachedTempTwo][2];
            var startTwo = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, true, postgresClientMain, mongoClientMain, masterQueryArray);
            var endTwo = process.hrtime(startTwo);
            groupTwoQueryTimes.push((endTwo[1]/1000000).toFixed(3) + 'ms');
        }

        //Time logged for running 30 uncached queries with Union and Subset checking
        for (var uncachedTemp in subsetUnionQueryArray) {
            const queryLabel = subsetUnionQueryArray[uncachedTemp][0];
            const collection = subsetUnionQueryArray[uncachedTemp][1];
            const aggregateQuery = subsetUnionQueryArray[uncachedTemp][2];
            var start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, true, false, postgresClientMain, mongoClientMain, masterQueryArray);
            var end = process.hrtime(start);
            groupOneQueryTimes.push((end[1]/1000000).toFixed(3) + 'ms');
        }
    } catch (e) {
        console.log(e);
    } finally {
        console.log('**************** RESULTS ******************');
        console.log('Group One Query Times:');
        console.log(groupOneQueryTimes);
        console.log('\n Group Two Query Times');
        console.log(groupTwoQueryTimes);
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

//Overall test to determine additional time needed to cache query as compared to simply querying MongoDB database
async function cachingVsPullingFromMongo() {
    let groupOneQueryTimes = [];
    let groupTwoQueryTimes = [];
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Postgres tables wiped to ensure integrity of tests
        clearTables(postgresClientMain);

        //Time logged for running 30 uncached queries
        for (let cachedTemp in cachedQueries) {
            const queryLabel = cachedQueries[cachedTemp][0];
            const collection = cachedQueries[cachedTemp][1];
            const aggregateQuery = cachedQueries[cachedTemp][2];
            let start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, true, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            let end = process.hrtime(start);
            groupOneQueryTimes.push((end[1]/1000000).toFixed(3) + 'ms');
        }
        
        clearTables(postgresClientMain);

        //Time logged for running 30 uncached queries AND caching them
        for (let cachedTemp in cachedQueries) {
            const queryLabel = cachedQueries[cachedTemp][0];
            const collection = cachedQueries[cachedTemp][1];
            const aggregateQuery = cachedQueries[cachedTemp][2];
            let start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            let end = process.hrtime(start);
            groupTwoQueryTimes.push((end[1]/1000000).toFixed(3) + 'ms');
        }
    } catch (e) {
        console.log(e);
    } finally {
        console.log('**************** RESULTS ******************');
        console.log('Group One Query Times:');
        console.log(groupOneQueryTimes);
        console.log('\n Group Two Query Times');
        console.log(groupTwoQueryTimes);
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

//Simple demo methods displaying each possible query stage
async function demoCacheQueries(){
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Postgres tables wiped to ensure integrity of tests
        clearTables(postgresClientMain);

        //Time logged for running 30 uncached queries
        for (let cachedTemp in baseQueries) {
            const queryLabel = baseQueries[cachedTemp][0];
            const collection = baseQueries[cachedTemp][1];
            const aggregateQuery = baseQueries[cachedTemp][2];
            let start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, true, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            let end = process.hrtime(start);
        }
    } catch (e) {
        console.log(e);
    } finally {
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

async function demoCachedQueries(){
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Time logged for running 30 uncached queries
        for (let cachedTemp in baseQueries) {
            const queryLabel = baseQueries[cachedTemp][0];
            const collection = baseQueries[cachedTemp][1];
            const aggregateQuery = baseQueries[cachedTemp][2];
            let start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, false, false, postgresClientMain, mongoClientMain, masterQueryArray);
            let end = process.hrtime(start);
        }
    } catch (e) {
        console.log(e);
    } finally {
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

async function demoUnionSubsetCached(){
    try {
        await postgresClientMain.connect();
        await mongoClientMain.connect();

        //Time logged for running 30 uncached queries
        for (let cachedTemp in subsetUnionQueryArray) {
            const queryLabel = subsetUnionQueryArray[cachedTemp][0];
            const collection = subsetUnionQueryArray[cachedTemp][1];
            const aggregateQuery = subsetUnionQueryArray[cachedTemp][2];
            let start = process.hrtime();
            await query(collection, queryLabel, aggregateQuery, false, true, false, postgresClientMain, mongoClientMain, masterQueryArray);
            let end = process.hrtime(start);
        }
    } catch (e) {
        console.log(e);
    } finally {
        postgresClientMain.end();
        mongoClientMain.close();
    }
}

// cachedVsUncached();
// uncachedVsUnionSubsetChecking();
// uncachedVsSemanticChecking();
// unionSubsetCheckingVsSemanticChecking();
// cachingVsPullingFromMongo();

// **************************** DEMO **************************************
demoCacheQueries();
// demoCachedQueries();
// demoUnionSubsetCached();
