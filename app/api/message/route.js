'use client';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/schemas/contactSchemas';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const department = searchParams.get('department');

  const filter = {};
  if (name) filter.name = name;
  if (department) filter.department = department;

  const data = await Contact.find(filter).sort({ createdAt: -1 });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const created = await Contact.create(body);
  return new Response(JSON.stringify(created), { status: 201 });
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const { id, ...updateFields } = body;

  const updated = await Contact.findByIdAndUpdate(id, updateFields, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  await Contact.findByIdAndDelete(id);
  return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
}

