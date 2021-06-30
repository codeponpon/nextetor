-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BAN');

-- CreateEnum
CREATE TYPE "createdBy" AS ENUM ('WEBSITE', 'ADMIN');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'CALL_CENTER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "roleId" INTEGER,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdBy" "createdBy" DEFAULT E'WEBSITE',
    "status" "userStatus" NOT NULL DEFAULT E'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mobile" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthday" TIMESTAMP(3),
    "lineID" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RoleType" NOT NULL DEFAULT E'ADMIN',
    "thirdPartyInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE INDEX "User.username_index" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile.mobile_unique" ON "Profile"("mobile");

-- CreateIndex
CREATE INDEX "Profile.mobile_index" ON "Profile"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_unique" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role.name_unique" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
