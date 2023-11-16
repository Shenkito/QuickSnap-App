import './Posts.css'

export default function Posts() {
    return (
        <div className="posts-wrapper">
            <div className="post-cards">
                <div key="{post.id}" className="card">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6A8VojGxrMuOSUtEqrdhG_-HqGIEO9QMtdku8Fq-W50CS6muEWJPbJHWzzmCOs8gC0w&usqp=CAU" // Replace with the image source from your data
                        alt=""
                        className="card-img-top"
                    />
                    <div className="card-body">
                        <h3 className="card-title">Title</h3>
                        <p className="card-text">Description</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-body-secondary">Date</span>
                    </div>
                </div>
            </div>
            {/* Pagination component */}
            {/* Add pagination component here */}
        </div>
    );
}