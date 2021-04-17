import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import Entity from "./EntityCard";
import postsApi from "../api/posts";
import communitiesApi from "../api/communities";

import Spinner from "../Partials/Spinner/Spinner";
import {
  withRouter
} from "react-router-dom";

const DEFAULT_PER_PAGE = 10;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{ 
    },
  }),
);

function Entities(props: any){
    const classes = useStyles();
    const [entities, setEntities] = React.useState<any>([]);
    const [shouldPaginate, setShouldPaginate] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [timer, setTimer] = React.useState<any>(null);

    function setVote(vote: any){
      const newEntities = entities.map((entity: any) => {
        if(entity.id === vote.entityId){
          var newEntity = {...entity};

          newEntity.vote = {
            id: vote.id,
            upOrDown: vote.upOrDown,
            createdAt: vote.createdAt
          };

          return newEntity;
        }

        return entity;
      })

      setEntities(newEntities);
    }

    useEffect(() => {
      getAll({
        per_page: DEFAULT_PER_PAGE,
        page_number: page
      });

      window.addEventListener("scroll", infinitePaging)
    }, [])

    useEffect(() => {
      if(shouldPaginate){
        getAll({
          per_page: DEFAULT_PER_PAGE,
          page_number: page + 1
        });
  
        setPage(page + 1);
      }
    }, [shouldPaginate])

    function infinitePaging(event : any){
      clearTimeout(timer);

      var body = document.body, html = document.documentElement;

      var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

      if(window.pageYOffset > height * 0.7){
        setShouldPaginate(true);

        setTimer(setTimeout(() => {
          setShouldPaginate(false);
        }, 1000));
      }
    }

    function getAll(data: any){

      if(props.match.path === "/posts"){
        getPosts(data);
      }else{
        getCommunities(data);
      }
    } 

    function getCommunities(data: any){
      communitiesApi.paginate(data).then((response) =>{
        setEntities([
          ...entities,
          ...response.data.rows
        ]);
      }).catch((error) => {
        console.log(error);
      })
    }

    function getPosts(data: any){
      postsApi.paginate(data).then((response) =>{
        setEntities([
          ...entities,
          ...response.data.rows
        ]);
      }).catch((error) => {
        console.log(error);
      })
    }

    if(entities.length){
      return (
          <section className={classes.root}>
            { 
              entities.map((entity: any) => {
                return <Entity
                          setVote={setVote}
                          key={entity.id} 
                          entity={entity}
                        ></Entity >
              })
            }
          </section>
      );
    }

    return (
      <section>
        <Spinner></Spinner>
      </section>
    )
}

export default withRouter(Entities);