const prettier = require("prettier");
const path = require("path");

const input = `
class T {

  @DELETE
  @Path("/signapprovers/{projectKey}/{repoSlug}")
  @Consumes({ MediaType.APPLICATION_JSON })
  @PermissionRequired({ Permission.REPO_ADMIN })
  public Response deleteSignapprovers(
    @PathParam("projectKey") final String projectKey,
    @PathParam("repoSlug") final String repoSlug,
    RestBranchSignapprovers signapprovers
  ) {
    Repository repository = repositoryService.getBySlug(projectKey, repoSlug);
    RestCommand c = new RestCommand(
      authenticationContext,
      permissionService,
      repository.getProject().getId(),
      repository.getId()
    ) {
      @Override
      Response doExecute() {
        dao
          .getSignapprovers(projectKey, Optional.of(repoSlug))
          .ifPresent(l -> { // <<<<<<<<<< OK
            l.remove(signapprovers);
            dao.setSignapprovers(projectKey, Optional.of(repoSlug), l);
            try {
              auditEventPublisher.publishRepositoryAuditEvent(
                projectKey,
                repoSlug,
                signApproverJsonUtil.serializeNonNull(signapprovers),
                WorkzoneConfigChangedEvents.WorkzoneSignApproversConfigDeletedEvent.name()
              );
            } catch (IOException e) {
              log.warn(e.getMessage(), e);
            }
          });
        return Response.ok().build();
      }
    };
    return c.execute();
  }
}
`;

try {
  const output = prettier.format(input, {
    parser: "java",
    plugins: [path.resolve(__dirname)],
    tabWidth: 2,
    semi: false,
    trailingComma: "es5",
    singleQuote: true,
    printWidth: 100,
  });
  console.log(output);
} catch (err) {
  console.log(err);
}
