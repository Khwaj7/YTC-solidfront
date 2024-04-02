import { IChannel } from "../../../models/IChannel";
import { EElementType, GenericCard } from "../../../components/genericCard";

interface IProps {
    channel: IChannel;
}

export function ChannelCard(props: IProps) {
    return (<GenericCard backgroundImageUrl={props.channel.thumbnail} name={props.channel.name} elementType={EElementType.CHANNEL}></GenericCard>)
}