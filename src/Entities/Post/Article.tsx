import Typography from '@material-ui/core/Typography';

interface ArticleProps{
    className: string
}

function Article(props: ArticleProps){

    const { className } = props;
    
    return(
        <section className={className}>
            <article>
                <Typography align="left" variant="h3" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>

                <Typography align="left" variant="body1" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
            </article>
        </section>
    );
}   


export default Article;