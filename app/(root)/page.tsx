import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {
    const query = (await searchParams).query;
    const params = { search: query || null };

    const session = await auth();

    console.log(session?.user?.id);
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

    // const posts = [{
    //     _createdAt: new Date(),
    //     views: 55,
    //     author: {
    //         _id: 1,
    //         name: "Rahim",
    //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnoniL4yagtAaB0FkoOZM-EGN72M8DEKFuMA&s",
    //     },
    //     title: "We Robots",
    //     category: 'Robots',
    //     _id: 1,
    //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnoniL4yagtAaB0FkoOZM-EGN72M8DEKFuMA&s",
    //     description: "This is a Description",
    // }]
    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Pitch Your Startup, <br />
                    Connect With Entrepreneurs
                </h1>

                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
                    Competitions.
                </p>
                <SearchForm query={query} />
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `search result for "${query}"` : "All Startups"}
                </p>
                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupTypeCard) => (
                            <StartupCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className="no-results">No startups found</p>
                    )}
                </ul>
            </section>

            <SanityLive />
        </>
    )
}