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
    name: {
      type: GraphQLString,
      resolve: person => person.name
    }
  })
})

// const FighterType = new GraphQLObjectType({
//   name: 'Fighter',
//   fields: () => ({
//     id: globalIdField('Fighter'),
//     _id: {
//       type: GraphQLInt,
//       resolve: fighter => fighter.id
//     },
//     profileImage: {
//       type: GraphQLString,
//       resolve: fighter => fighter.profile_image
//     },
//     firstName: {
//       type: GraphQLString,
//       resolve: fighter => fighter.first_name
//     },
//     lastName: {
//       type: GraphQLString,
//       resolve: fighter => fighter.last_name
//     },
//     nickname: { type: GraphQLString },
//     weightClass: {
//       type: GraphQLString,
//       resolve: fighter => fighter.weight_class
//     },
//     wins: { type: GraphQLInt },
//     losses: { type: GraphQLInt },
//     draws: { type: GraphQLInt },
//     beltThumbnail: {
//       type: GraphQLString,
//       resolve: fighter => fighter.belt_thumbnail
//     },
//     link: { type: GraphQLString }
//   })
// })

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    allFighters: {
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
