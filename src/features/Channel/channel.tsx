import {useChannel} from "~/features/Channel/useChannel";

interface IParams {
    userId: number;
}

export default (props: IParams) => {
    const {
        channels,
        fetchChannels
    } = useChannel();

    fetchChannels(props.userId).then(
        () => console.log(channels)
    );

    return (
        <>
            <h2>Your channels</h2>
        </>
    )
}