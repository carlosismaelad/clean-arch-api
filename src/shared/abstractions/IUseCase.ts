export default interface IUseCase<I, O> {
  execute(i: I): Promise<O>;
}
