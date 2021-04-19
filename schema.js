import graphql from "graphql";
import axios from "axios";

//Launch type
const LaunchType = new graphql.GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: graphql.GraphQLInt },
    mission_name: { type: graphql.GraphQLString },
    launch_year: { type: graphql.GraphQLString },
    launch_date_local: { type: graphql.GraphQLString },
    launch_success: { type: graphql.GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

//Rocket type
const RocketType = new graphql.GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: graphql.GraphQLString },
    rocket_name: { type: graphql.GraphQLString },
    rocket_type: { type: graphql.GraphQLString },
  }),
});

// Query type

const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    launches: {
      type: new graphql.GraphQLList(LaunchType),
      async resolve(_, args) {
        try {
          const res = await axios.get("https://api.spacexdata.com/v3/launches");
          return res.data;
        } catch (err) {
          return console.log(err);
        }
      },
    },
  }),
});
export default new graphql.GraphQLSchema({ query: queryType });
