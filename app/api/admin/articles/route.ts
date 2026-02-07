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

  const result = await getAdminArticlesPaginated(cursor, limit);

  return NextResponse.json(result);
}
