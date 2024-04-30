import styled from "styled-components"
import VerticalSpacer from "../../VerticalSpacer.tsx"
import { genRandomInt } from "../../../../utils/genRandomInt.ts"
import { genRandomDecimal } from "../../../../utils/genRandomDecimal.ts"

const AttachmentSkeletonWrapper = styled.div`
  background-color: rgb(219, 222, 225);
  border-radius: 6px;
  margin-right: 16px;
  margin-top: 6px;
  opacity: 0.03;
`

const AttachmentSkeleton = ({
  height,
  width,
}: {
  height: number
  width: number
}) => {
  return <AttachmentSkeletonWrapper style={{ height, width }} />
}

const MessageSkeletonWrapper = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 72px 1fr;
`

const ProfilePictureSkeleton = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: rgb(219, 222, 225);
  opacity: 0.08;
`

const NameDisplaySkeleton = styled.div`
  background-color: rgb(219, 222, 225);
  height: 16px;
  width: 120px;
  border-radius: 8px;
`

const MessageSkeleton = () => {
  const hasAttachment = genRandomInt(1, 3) === 1
  return (
    <MessageSkeletonWrapper>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProfilePictureSkeleton />
      </div>
      <div>
        <NameDisplaySkeleton
          style={{
            width: genRandomInt(75, 125),
            opacity: genRandomDecimal(0.1, 0.2, 6),
          }}
        />
        {Array.from({ length: genRandomInt(1, 3) }, (_, i) => {
          return <ChatContentRowSkeleton key={i} />
        })}
        {hasAttachment && (
          <AttachmentSkeleton
            height={genRandomInt(120, 350)}
            width={genRandomInt(120, 350)}
          />
        )}
      </div>
    </MessageSkeletonWrapper>
  )
}

const ChatContentSkeleton = styled.div`
  background-color: rgb(219, 222, 225);
  opacity: 0.06;
  height: 16px;
  width: 100px;
  border-radius: 8px;
  margin-top: 6px;
`

const ChatContentRowSkeletonWrapper = styled.div`
  display: flex;
  gap: 4px;
`

const ChatContentRowSkeleton = () => {
  return (
    <ChatContentRowSkeletonWrapper>
      {Array.from({ length: genRandomInt(3, 8) }, (_, i) => {
        return (
          <ChatContentSkeleton
            key={i}
            style={{ width: genRandomInt(30, 90) }}
          />
        )
      })}
    </ChatContentRowSkeletonWrapper>
  )
}

const MessagesLoadingSkeleton = () => {
  return (
    <>
      <VerticalSpacer height={30} />
      {Array.from({ length: 25 }, (_, i) => {
        return <MessageSkeleton key={i} />
      })}
    </>
  )
}

export default MessagesLoadingSkeleton
