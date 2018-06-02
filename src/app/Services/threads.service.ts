import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  

  get_latest_threads(count)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadsByTime?count='+count, {headers: headers})
    .map(res => res.json());
  }

  get_hot_threads(count)
  {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadsByViews?count='+count, {headers: headers})
    .map(res => res.json());

    
  }

  get_top_threads(count)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getThreadsByAnswers?count='+count, {headers: headers})
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

  getAllPosts(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getAllPosts?id='+id, {headers: headers})
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
}
