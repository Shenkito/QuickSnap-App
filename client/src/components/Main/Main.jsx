import { useState, useEffect } from 'react';
import './Main.css'

export default function Main() {

    const [showLatest, setShowLatest] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLatest(true);
        }, 1000);

        return () => clearTimeout;
    }, []);

    return (
        <div className="element">
            <h1 className={showLatest ? 'latest show' : 'latest'}>Latest Posts</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
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
                <div className="col">
                    <div className="card h-100">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJstSSmv0aB6wlalUPTlJzxkJyFOXdnhMhBsEc35EMXsOX1_uhCVwMgifEf3kZI3v5lwE&usqp=CAU" className="card-img-top" alt="Card 1" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-body-secondary">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYn5zGLpW-TPd-XzRrMfLUy5YTjiZQQzS6sjUEBrkAkznfhQuMknU8jdJOboShXGzbM0&usqp=CAU" className="card-img-top" alt="Card 1" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-body-secondary">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                {/* Add more cards in similar structure */}
            </div>
        </div>
    );
}