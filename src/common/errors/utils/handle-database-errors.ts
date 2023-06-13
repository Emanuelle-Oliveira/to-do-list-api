import { PrismaClientError } from '../types/prisma-client-error';
import { DatabaseError } from '../types/database-error';

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    default:
      return new DatabaseError(e.message);
  }
};
