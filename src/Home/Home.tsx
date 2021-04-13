import PostsCardsList from '../Posts/PostsCardsList'

interface HomeProps{
    className: string
}

function Home(props : HomeProps){
    const { className } = props; 

    return(
        <section className={className}>
            <PostsCardsList></PostsCardsList>
        </section>
    );
}

export default Home;