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

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    name: { type: GraphQLString },
    hairColor: {
      type: GraphQLString,
      resolve: person => person.hair_color
    },
    birthYear: {
      type: GraphQLString,
      resolve: person => person.birth_year
    },
    gender: { type: GraphQLString },
    mass: { type: GraphQLInt,
            resolve: (person) => {
              if (person.mass == "unknown") {
                return -1;
              }
              if (person.mass % 1 === 0) {
                return person.mass
              } else {
                return parseInt(person.mass.replace(/,/g, ''), 10)
              }
          }
    },
    height: { type: GraphQLInt,
            resolve: (person) => {
              if (person.height == "unknown") {
                return -1;
              }
              if (person.mass % 1 === 0) {
                return person.height
              } else {
                return parseInt(person.height.replace(/,/g, ''), 10)
              }
            }
    },
    homeworld: {
      type: GraphQLString,
      resolve: async (person) => {
        const resp = await fetch(person.homeworld);
        const data = await resp.json();
        return data.name
      }
    },
    films: {
      type: new GraphQLList(GraphQLString),
      resolve: async (person) => {
        const result = [];
        var i;
        for (i =0; i < person.films.length; i++) {
          const resp = await fetch(person.films[i]);
          const data = await resp.json();
          result.push(data.title)
        }
        return result
      }
    },
    species: {
      type: GraphQLString,
      resolve: async (person) => {
        const resp = await fetch(person.species[0]);
        const data = await resp.json();
        return data.name
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
        var results = [];
        var i;
        var url = 'https://swapi.co/api/people/'
        while (!!url) {
          const resp = await fetch(url);
          const data = await resp.json();
          url = data.next;
          results = [...results, ...data.results];
        }
        return results;
  	  }
    }
  })
})

export const schema = new GraphQLSchema({
  query: QueryType
})
