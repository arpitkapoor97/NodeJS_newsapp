const express = require('express')

const newsRouter = express.Router()

const axios = require('axios')

const api_key = '#'

newsRouter.get('', async(req,res)=>{
    //res.render('news')
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${api_key}`)
        //console.log(newsAPI.data)
        res.render('news', {articles : newsAPI.data.articles})
    } catch (err) {
        if (err.response){
            res.render('news', {articles : null})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        }else if (err.request){
            console.log(err.request)
            res.render('news', {articles : null})
        }
        else{
            console.log('Error',err.message)
            res.render('news', {articles : null})
        }
    }   
})

newsRouter.post('', async(req,res)=> {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`http://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=${api_key}`)
        res.render('newsSearch', {articles: newsAPI.data.articles})
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    }
})

module.exports = newsRouter
