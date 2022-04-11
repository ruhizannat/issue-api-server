'use strict';

/**
 *  issue controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::issue.issue', ({ strapi }) =>({
    async create(ctx) {
        console.log(ctx.state.user);
        const author = ctx.state.user.id;
        ctx.request.body.data.author = author;
        console.log(ctx.request.body.data);

        // some logic here
        const response = await super.create(ctx);
        // some more logic
      
        return response;
      },
      async delete(ctx) {
          const authorId =  ctx.request.body.data;
          const {id} = ctx.params;
        //   find the issue by id
        // compare the author 
        const foundIssue = await strapi.entityService.findOne(
            'api::issue.issue', 
            +id,
            {
                populate: 'author',
            }
            );
        console.log(foundIssue)
        if(!foundIssue) return ctx.notFound('issue is not found to be deleted');
        if(foundIssue && foundIssue.author.id !== authorId){
            // not the owner
           return ctx.unauthorized('you are not be owner of  issue')

        }
            
       
        // some logic here
        const response = await super.delete(ctx);
        // some more logic
      
        return response;
      },
      async update(ctx) {
        const loggedInUserID =  ctx.request.body.data;
        const {id} = ctx.params;
      //   find the issue by id
      // compare the author 
      const foundIssue = await strapi.entityService.findOne(
          'api::issue.issue', 
          +id,
          {
              populate: 'author',
          }
          );
      console.log(foundIssue)
      if(!foundIssue) return ctx.notFound('issue is not found to be updated');
      if(foundIssue && foundIssue.author.id !== loggedInUserID){
          // not the owner
         return ctx.unauthorized('You are not authorized to update the issue')

      }
          
        // some logic here
        const response = await super.update(ctx);
        // some more logic
      
        return response;
      },
      async completedIssue(ctx) {
        const loggedInUserID = ctx.state.user.id;
        const { id } = ctx.params;
        //find the issue by id
        const foundIssue = await strapi.entityService.findOne(
          "api::issue.issue",
          +id,
          {
            populate: "assignedTo",
          }
        );
        console.log(foundIssue)
    
        if (foundIssue.assignedTo.id !== loggedInUserID) {
          return ctx.unauthorized("You are not authorized to completed the issue");
        }
        const response = await super.update(ctx);
    
        return response;
      },
       
       

}) );
