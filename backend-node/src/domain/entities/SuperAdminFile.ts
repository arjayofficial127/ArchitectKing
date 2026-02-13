/**
 * SuperAdmin File domain entity
 */
export class SuperAdminFile {
  constructor(
    public readonly id: string,
    public readonly folderId: string | null,
    public readonly name: string,
    public readonly fileType: 'txt' | 'md' | 'rtf',
    public readonly content: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
