import { HttpException, HttpStatus } from '@nestjs/common';

export const validateProfile = (
  profiles: string[],
  currentProfileId: string,
): boolean => {
  const isValidProfileAction = profiles?.includes(currentProfileId);
  if (!isValidProfileAction)
    throw new HttpException(
      'Operations on this profile is not authorised',
      HttpStatus.BAD_REQUEST,
    );
  return isValidProfileAction;
};

export const extractProfileIds = (req) => {
  return req?.user?.profiles?.map((profile) => profile.id) || [];
};
