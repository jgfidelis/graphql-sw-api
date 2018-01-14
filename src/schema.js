import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import {
  globalIdField,
} from 'graphql-relay';

import fetch from 'node-fetch'

const HomeworldType = new GraphQLObjectType({
  name: 'Homeworld',
  fields: () => ({
    name: { type: GraphQLString}
  })
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    name: { type: GraphQLString },
    hair_color: {
      type: GraphQLString,
      resolve: person => person.hair_color
    },
    birthYear: {
      type: GraphQLString,
      resolve: person => person.birth_year
    },
    gender: { type: GraphQLString },
    mass: { type: GraphQLInt },
    height: { type: GraphQLInt },
    homeworld: {
      type: HomeworldType,
      resolve: (person) => {
        return fetch(person.homeworld)
          .then(res => res.json())
          .then(json => json)
      }
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: async () => {
    		const resp = await fetch('https://swapi.co/api/people/');
    		const data = await resp.json();
    		return data.results;
  	  }
    }
  })
})

export const schema = new GraphQLSchema({
  query: QueryType
})
