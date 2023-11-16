import Hero from '../../components/hero/Hero';
import Main from '../../components/main/Main';

import './Home.css';

export default function Home() {
    return (
        <section className="home">
            <Hero />
            <Main />
        </section>

    );
}