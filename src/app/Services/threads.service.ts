import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  

  get_latest_threads(start, limit)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadsByTime?start='+start+'&limit='+limit, {headers: headers})
    .map(res => res.json());
  }

  get_hot_threads(count)
  {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadsByViews?count='+count, {headers: headers})
    .map(res => res.json());

    
  }

  get_top_threads(start, limit)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getTopThreads?start='+start+'&limit='+limit, {headers: headers})
    .map(res => res.json());
  }

  get_thread_user(id, start, limit)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadUser?id='+id+'&start='+start+'&limit='+limit, {headers: headers})
    .map(res => res.json());
  }


  get_thread_by_id(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadById?id='+id, {headers: headers})
    .map(res => res.json());
  }

  get_thread_post_ids(id)
  {
    
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadPostIds?id='+id, {headers: headers})
    .map(res => res.json());
  }


  getPostById(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/posts/getPost?id='+id, {headers: headers})
    .map(res => res.json());
  }

  getAllPosts(id,start,end)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getAllPosts?id='+id+'&start='+start+'&end='+end+'', {headers: headers})
    .map(res => res.json());
  }

  getUser(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile?id=1', {headers: headers})
    .map(res => res.json());
  }

  get_all_comments(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/comment/getAll?id='+id, {headers: headers})
    .map(res => res.json());
  }

 
  insert_post(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/insert', data, {headers: headers})
    .map(res => res.json());
  }


  insert_post_simple(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/insert_simple', data, {headers: headers})
    .map(res => res.json());
  }

  insert_comment(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/comment/insert', data, {headers: headers})
    .map(res => res.json());
  }


  getallTags()
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getAllTags', {headers: headers})
    .map(res => res.json());
  }

  getTagbyId(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/helper/getTag?id='+id, {headers: headers})
    .map(res => res.json());
  }
  insertThread(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/thread/insert',data, {headers: headers})
    .map(res => res.json());
  }


  opThread(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/thread/updateOp',data, {headers: headers})
    .map(res => res.json());
  }


  setAssociation(data)
  {
    console.log(data);
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/thread/setAssoc',data, {headers: headers})
    .map(res => res.json());
  }


  upVote(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/upVote',data, {headers: headers})
    .map(res => res.json());
  }
  downVote(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/downVote',data, {headers: headers})
    .map(res => res.json());
  }

  getThreadbyUserTop(id, start, limit)
  {
    console.log(id);
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadsByIdVotes?id='+id+'&start='+start+'&limit='+limit, {headers: headers})
    .map(res => res.json());
  }

  getThreadbyUser(id, start, limit)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadsById?id='+id+'&start='+start+'&limit='+limit, {headers: headers})
    .map(res => res.json());
  }

  getAllCategory(start, limit)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/categories/getAll?start='+start+"&limit="+limit, {headers: headers})
    .map(res => res.json());

  }

  getCategoryThreads(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/categories/getThreads?id='+id, {headers: headers})
    .map(res => res.json());

  }
  getCategoryTags(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/categories/getTags?id='+id, {headers: headers})
    .map(res => res.json());

  }
  getThreadTags(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getTags?id='+id, {headers: headers})
    .map(res => res.json());

  }
}
