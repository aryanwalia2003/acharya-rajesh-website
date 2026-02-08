import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth-utils';
import { getAdminArticlesPaginated } from '@/app/admin/articles/data';

export async function GET(request: NextRequest) {
  // Auth check
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || '20');

  const status = searchParams.get('status') as 'PUBLISHED' | 'UNLISTED' | 'DRAFT' | null;

  const result = await getAdminArticlesPaginated(cursor, limit, status);

  return NextResponse.json(result);
}
