import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'thiago159',
        database: 'nest-api',
        entities: ['./dist/**/entities/*.entity.js'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

// export const dataSource = new DataSource({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'thiago159',
//   database: 'nest-api',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
// });
