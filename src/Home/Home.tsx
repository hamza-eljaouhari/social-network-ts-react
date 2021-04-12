import PostsList from '../Posts/PostsList'

interface HomeProps{
    className: string
}

function Home(props : HomeProps){
    const { className } = props; 

    return(
        <section className={className}>
            <PostsList></PostsList>
        </section>
    );
}

export default Home;