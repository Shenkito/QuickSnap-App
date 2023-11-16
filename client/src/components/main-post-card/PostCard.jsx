import './PostCard.css'

export default function PostCard() {
    return (
        <div className="col">
            <div className="card h-100">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6A8VojGxrMuOSUtEqrdhG_-HqGIEO9QMtdku8Fq-W50CS6muEWJPbJHWzzmCOs8gC0w&usqp=CAU" className="card-img-top" alt="Card 1" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                </div>
            </div>
        </div>
    );
}