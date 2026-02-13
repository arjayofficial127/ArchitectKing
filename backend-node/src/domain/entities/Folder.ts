/**
 * Folder domain entity
 */
export class Folder {
  constructor(
    public readonly id: string,
    public readonly parentFolderId: string | null,
    public readonly name: string,
    public readonly ownerUserId: string,
    public readonly createdAt: Date
  ) {}
}
