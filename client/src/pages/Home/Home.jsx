import Hero from '../../components/Hero/Hero';
import Main from '../../components/Main/Main';

import './Home.css';

export default function Home() {
    return (
        <section className="home">
            <Hero />
            <Main />
        </section>

    );
}