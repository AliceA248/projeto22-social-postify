export class MediaEntity {
  username: string;
  title: string;
  constructor(title: string, username: string) {
    this.title = title;
    this.username = `http://www.${title}.com/${username}`;
  }
}
