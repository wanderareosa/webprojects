import { Component } from 'react';
import './style.css';
import {Posts} from '../../components/Posts';
import {loadPosts} from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {

  state = {
    posts:[],
    allPosts:[],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }
  async componentDidMount(){
    await this.loadPosts()
  }

  loadPosts = async () =>{
    const {page, postsPerPage} = this.state;
    const postAndPhotos = await loadPosts();    
    this.setState({
      posts : postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos
    });

  }

  loadMorePosts = () =>{
    const { posts,
        allPosts,
        page,
        postsPerPage
       } = this.state;

    const nextPage = page+postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage+postsPerPage);
    posts.push(...nextPosts)
    this.setState({posts, page: nextPage}) 
  }

  handleInputChange = (e) =>{
    const {value} = e.target;
    this.setState({searchValue: value})
    
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const disabled = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post =>{
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
        );
    })
     : posts;


    return (
      <section className="container">
      {!!searchValue&&(
        <>
        <h1>Search Value: {searchValue}</h1><br/>
        </>
        )}
        <div className="search-container">
          <TextInput searchValue={searchValue} 
                    handleInputChange= {this.handleInputChange}/>
        </div>
        {filteredPosts.length > 0 &&(          
            <Posts posts={filteredPosts}/>            
        )}

        {filteredPosts.length === 0 &&(          
            <p>Não existem posts</p>
        )}
        
        <div className="button-container">
        {!searchValue && (
          <Button 
            text="Next Page"
            onClick={this.loadMorePosts}
            disabled = {disabled}
          />                  
        )}

        </div>
      </section>
  );
  }

}

