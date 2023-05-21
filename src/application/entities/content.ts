export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validadeContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLenghtValid = this.validadeContentLenght(content);

    if (!isContentLenghtValid) {
      throw new Error('content lenght error.');
    }

    this.content = content;
  }
}
