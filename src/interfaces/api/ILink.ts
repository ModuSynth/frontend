export default interface ILink {
    id: string;
    // This is the UUID of the output port from where the link extends.
    from: string,
    // This is the UUID of the input port the link is leading to.
    to: string
}