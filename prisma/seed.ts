import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const logger = new Logger();

async function main() {
  logger.log('Starting seed.');

  // const user = await prisma.user.create({
  //   data: {
  //     avatar:
  //       'https://ovicio.com.br/wp-content/uploads/2023/06/20230614-ovicio-rick-morty-season-7.jpg',
  //     email: 'fernandocostadev98@gmail.com',
  //     firstName: 'Fernando',
  //     lastName: 'Costa',
  //     externalId: null,
  //   },
  // });
  const user = await prisma.user.findFirst();

  logger.log('Added seed user');

  const barbecue = await prisma.barbecue.create({
    data: {
      date: '2023-10-22',
      hour: '10:30',
      isPublic: true,
      maxCapacity: 10,
      minContribution: 250.0,
      title: 'Churras contratação Fernando.',
      totalPrice: 900.0,
      createdBy: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  await prisma.barbecue.createMany({
    data: [
      {
        date: '2023-10-21',
        hour: '10:00',
        maxCapacity: 150,
        minContribution: 23.0,
        title: 'Título 1',
        totalPrice: 900.0,
        userId: user.id,
        isPublic: true,
      },
      {
        date: '2023-10-01',
        hour: '10:00',
        maxCapacity: 150,
        minContribution: 4.0,
        title: 'Título 2',
        totalPrice: 5.0,
        userId: user.id,
        isPublic: true,
      },
      {
        date: '2023-10-09',
        hour: '10:00',
        maxCapacity: 150,
        minContribution: 900000.0,
        title: 'Título 3',
        totalPrice: 900.0,
        userId: user.id,
        isPublic: true,
      },
      {
        date: '2023-10-20',
        hour: '10:00',
        maxCapacity: 150,
        minContribution: 250.0,
        title: 'Título 1',
        totalPrice: 900.0,
        userId: user.id,
        isPublic: true,
      },
    ],
  });
  logger.log('Added barbecue');

  console.log({ barbecue, user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
