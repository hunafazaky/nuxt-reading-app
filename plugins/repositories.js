import createWorksRepository from "~/services/worksRepository";
import createUsersRepository from "~/services/usersRepository";

export default (ctx, inject) => {
  const repositories = {
    worksRepository: createWorksRepository(ctx.$axios),
    usersRepository: createUsersRepository(ctx.$axios),
  };
  inject("repositories", repositories);
};
